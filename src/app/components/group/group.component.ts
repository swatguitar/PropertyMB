import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails,GroupDetails } from '../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(public auth: AuthenticationService, private router: Router,private http: HttpClient, public sanitizer: DomSanitizer,) { 
  
 
  }
 
  ngOnInit() {
  }

}
