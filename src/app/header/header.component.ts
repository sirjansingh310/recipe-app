import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe/recipe.sevice';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() linkClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor(private recipeService: RecipeService, private dataStorargeService: DataStorageService, private router: Router, private authService: AuthService) { }
  isSaving: boolean = false;
  saveClicked: boolean = false;
  isError: boolean = false;
  userStateChangedSub: Subscription;
  isAuthenticated: boolean = false;
  ngOnInit() {
    this.userStateChangedSub = this.authService.userStateChanged.subscribe(user => {
      if(user){
        this.isAuthenticated = true;// todo: also check for if token doesn't expire
      }
      else{
        this.isAuthenticated = false;
      }
    })
  }

  // onLinkClick(tabName: string){
  //   this.linkClicked.emit(tabName);
  // }

  saveData(){
    this.saveClicked = true;
    this.isSaving = true;
    this.isError = false;
    this.dataStorargeService.saveData()
    .subscribe(resp => {
      this.isSaving = false;
      this.isError = false;
      setTimeout(() => {
        this.saveClicked = false;
      }, 2000)
    },
    err => {
      this.isSaving = false;
      this.isError = true;
      setTimeout(() => {
        this.saveClicked = false;
      }, 2000)
    })
  }

  fetchData(){
    this.router.navigate(['/']);// to avoid showing of recipe-detail 
    this.recipeService.isFetching.next(true);
  // this.recipeService.isFetching2 = true;
    this.dataStorargeService.fetchData()
    .subscribe(resp => {
      this.recipeService.updateRecipeList(resp);
        this.recipeService.isFetching.next(false);
        //this.recipeService.isFetching2 = false;
    })
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(){
    this.userStateChangedSub.unsubscribe();
  }
}
