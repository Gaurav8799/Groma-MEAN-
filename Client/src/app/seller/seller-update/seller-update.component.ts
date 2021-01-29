import { Component, OnInit,Inject } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-seller-update',
  templateUrl: './seller-update.component.html',
  styleUrls: ['./seller-update.component.css']
})
export class SellerUpdateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SellerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _item:ItemsService) {}

  onNoClick(): void {
    this.dialogRef.close(`You press cancel button`);
  }

  ngOnInit(): void {
  }

}
