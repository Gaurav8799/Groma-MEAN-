import { AfterViewInit, Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress','category', 'color','edit'];
  dataSource: MatTableDataSource<any>;
  orderList
  orderSts='Pending'
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _order:OrderService) { }

  ngOnInit(): void {
    this._order.getOrder().subscribe(res=>{
      console.log(res)
      this.orderList=res
      this.dataSource = new MatTableDataSource(this.orderList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  rowDetails(details){
    console.log(details) 
  }

  stsCng(row){
    console.log(`select changed `,row._id,row.status)
    this._order.putOrder(row).subscribe(res=>{
      console.log(res)
    })
  }

}
