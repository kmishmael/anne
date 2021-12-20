import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.css']
})
export class PosteditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formEdit = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    date: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl('')
  });

  onSubmit(): void{
    console.log(this.formEdit.value);
  }

}
