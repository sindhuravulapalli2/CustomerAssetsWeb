import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: Customer[] = [];
  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {  
    this.customerService.getAll().subscribe((data: Customer[])=>{         
      this.posts = data;      
    })  
  }
  deletePost(id:number){
    this.customerService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.CustomerId  !== id);
         console.log('Post deleted successfully!');
    })
  }
}
