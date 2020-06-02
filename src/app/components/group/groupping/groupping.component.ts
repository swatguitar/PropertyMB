import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails,GroupDetails } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-groupping',
  templateUrl: './groupping.component.html',
  styleUrls: ['./groupping.component.css']
})
export class GrouppingComponent implements OnInit {
  [x: string]: any;
  credentials:GroupDetails ={
    ID_Group: 0,
    ID_Item: 0,
    ID_Property: '',
    ID_member: 0,
    ID_User: 0,
    ID_Folder: 0,
    NameG: '',
    NameF: '',
    Email: '',
    Img: '',
    Created: ''
  }
  Groups: any[];
  GroupMs: any[];
  GDetails:any[];
  temp:any[] ;
  groupAll:any[]
  constructor(public auth: AuthenticationService, private router: Router,private http: HttpClient, public sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.GDetails = []
    this.getGroupDetailMember()
    this.getGroup()
  }
  toggleClass(){
    $('#sidebar').toggleClass('active');
  }
   //************* get group by owner id *************
   getGroup() {
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
    },
      err => {
        console.error(err)

      }
    )
  }

//************* get group that you are member  *************
  getGroupDetailMember() {
    this.auth.getGroupDetailMember().subscribe((group) => {
      this.GDetails = group;
      console.log(this.GDetails)
    },
      err => {
        console.error(err)

      }
    )
  }


}

