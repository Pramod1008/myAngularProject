import { Component,  OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private datastorageservice: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.datastorageservice.storeRecipe();
  }

  onFetchData()
  {
    this.datastorageservice.fetchData().subscribe();
  }
}
