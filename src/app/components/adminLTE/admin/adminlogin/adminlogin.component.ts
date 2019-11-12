import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.css"]
})
export class AdminloginComponent implements OnInit {
  mUsername:string = "";
  mPassword:string = "";

  constructor(private router:Router) {}

  ngOnInit() {}

  onSubmit() {
    this.router.navigate(["/admindash"]);
    /*if (this.mUsername == "Teerawat" && this.mPassword == "1234") {
      this.router.navigate(["/admindash"]);
    } else {
      window.alert("Login Failed");
    }*/
  }
}
