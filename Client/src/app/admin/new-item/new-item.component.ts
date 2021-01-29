import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/items.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  selectedValue: string;
  images;
  item={
    name:'',
    quantity:'',
    price:'',
    image:'',
    category:''
  }

  constructor(private _item:ItemsService) { }

  ngOnInit(): void {
  }

  selectImage(event){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.images=file;
    }
  }

  onSubmit(item){
    item.image=item.image.files[0]
    const formData= new FormData()
    formData.append('name',item.name)
    formData.append('quantity',item.quantity)
    formData.append('category',item.category)
    formData.append('description',item.description)
    formData.append('price',item.price)
    formData.append('image',item.image)
    this._item.addItem(formData).subscribe(res=>{
      console.log(res)
      // try to display snackbar here
      item.name=''
    })
  }

}
