import { Component, OnInit,Inject } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _item:ItemsService) {}

  onNoClick(): void {
    this.dialogRef.close(`You press cancel button`);
  }

  ngOnInit(): void {
  }

}
