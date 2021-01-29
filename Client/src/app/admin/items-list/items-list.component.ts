import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UpdateItemComponent } from '../update-item/update-item.component';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress','category', 'color','edit','delete'];
  dataSource: MatTableDataSource<any>;
  itemList

  // -----------------
  animal: string;
  name: string="Gaurav";
  // ---------------

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _item:ItemsService,public dialog: MatDialog) {}

  ngOnInit(){
    this._item.get().subscribe(res=>{
      console.log(res)
      this.itemList=res
      this.dataSource = new MatTableDataSource(this.itemList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(product){
    console.log(product._id)
    let index: number = this.itemList.findIndex(d => d === product);
    console.log(index)
    this._item.delItem(product._id).subscribe(res=>{
      console.log(res)
      this.itemList.splice(index,1)
      this.dataSource = new MatTableDataSource(this.itemList);
    })
  }

  openDialog(row): void {
    let index: number = this.itemList.findIndex(d => d === row);
    console.log(index)
    const dialogRef = this.dialog.open(UpdateItemComponent, {
      width: '350px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        result.image = result.image.files[0]
        const formData = new FormData()
        formData.append('name', result.name)
        formData.append('quantity', result.quantity)
        formData.append('category', result.category)
        formData.append('description', result.description)
        formData.append('price', result.price)
        formData.append('image', result.image)
        this._item.upItem(formData, row).subscribe(res => {
          console.log(res)
          this.itemList[index] = res
          this.dataSource = new MatTableDataSource(this.itemList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    });
  }


}





