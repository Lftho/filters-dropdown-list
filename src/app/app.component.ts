import { ServiceService } from './service.service';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns = ['name', 'username', 'email', 'gender'];
  dataSource!: MatTableDataSource<any>;
  apiResponse: any = [];
  genderOptions: any = [];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getUserData().subscribe((response: any) => {
      this.apiResponse = response;
      this.genderOptions = _.uniq(response.map((item: any) => item['gender'])) //dados unico sendo exibido dentro do dropdown
      this.dataSource = new MatTableDataSource(response);
      console.log('Itens do dropdown ', this.genderOptions)
    })
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
    console.log('FilterData', this.dataSource.filter)
  }

  changeFilter($event: any) {
    let filteredData = _.filter(this.apiResponse, (item) => {
      console.log('Filter', item)
      return item.gender == $event.value;
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

}
