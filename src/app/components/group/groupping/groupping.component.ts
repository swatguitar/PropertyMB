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
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
    },
      err => {
        console.error(err)

      }
    )
    this.auth.getgroupM().subscribe((group) => {
      this.GroupMs = group;
    },
      err => {
        console.error(err)

      }
    )

    setTimeout(() => {
      this.auth.getgroupAll().subscribe((group) => {
        this.groupAll = group
        for (var i = 0; i < this.GroupMs.length; i++) {
    
         this.temp = group.filter(article => {
       
            return article.ID_Group == this.GroupMs[i].ID_Group
          });
          this.GDetails = this.GDetails.concat(this.temp);
          //this.GDetails.push([this.temp ]);
      }
      },
        err => {
          console.error(err)
    
        }
      )
    }, 1000);
  }


}

