import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { CommonService } from "../common.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  sow: boolean = false;
  candidatedetails: boolean = false;
  mapping: boolean = false;
  domain: boolean = false;
  technology: boolean = false;
  login: boolean = false;
  dashboard: boolean = false;
  header: boolean = false;
  public isChecked = false;
  registration: boolean = false;
  @Output() eventChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  managePw: boolean = false;
  managePw1: boolean = false;
  ChangePW: boolean = false;
  Username: string = "";

  constructor(private commonServ: CommonService,private elementRef:ElementRef,private renderer: Renderer2) {}

  ngOnInit(): void {
   
    
    this.Username = this.getUserName();
    this.loggedIn();
  }
  MenuClose() {
    const closeElement: HTMLElement =
      this.elementRef.nativeElement.querySelector("#navbartoggler");

    if (closeElement) {
      closeElement.click();
    }
  }
  update() {
    this.isChecked = !this.isChecked;
    this.eventChange.emit(this.isChecked);

    console.log("menu");
  }

  logOut() {
    this.header = false;
    this.setAllDefaults();
    sessionStorage.clear();
    location.reload();
  }
  loggedIn() {
    this.commonServ.HeaderContent.subscribe((data) => {
      if (!data) {
        this.isChecked = false;
        this.eventChange.emit(this.isChecked);
      }
    });
    this.commonServ.loadMessage.subscribe((data) => {
      if (data) {
        if (
          sessionStorage.getItem("userData") != null ||
          sessionStorage.getItem("userData") != undefined
        ) {
          this.dashboard = true;
          this.login = true;
          this.header = true;
          let data = sessionStorage.getItem("userData");
          let resData = data ? JSON.parse(data) : null;
          if (resData.RoleName == "Admin") this.ChangePW = true;
          let ScreenNames = resData.ScreenNames.split(",");
          console.log(ScreenNames);
          if (
            sessionStorage.getItem("toggle") != null ||
            sessionStorage.getItem("toggle") != undefined
          ) {
            let obj = sessionStorage.getItem("toggle");
            let objData = obj ? JSON.parse(obj) : null;
            console.log(objData);
            for (let key of Object.keys(objData)) {
              if (key == "sow") {
                this.sow = objData.sow;
              }
              if (key == "candidatedetails") {
                this.candidatedetails = objData.candidatedetails;
              }
              if (key == "mapping") {
                this.mapping = objData.mapping;
              }
              if (key == "domain") {
                this.domain = objData.domain;
              }
              if (key == "technology") {
                this.technology = objData.technology;
              }
              if (key == "registration") {
                this.registration = objData.registration;
              }
            }
          } else {
            for (let i = 0; i < ScreenNames.length; i++) {
              if (ScreenNames[i].toLowerCase() == "sow") {
                this.sow = true;
              }
              if (ScreenNames[i].toLowerCase() == "candidatedetails") {
                this.candidatedetails = true;
              }
              if (ScreenNames[i].toLowerCase() == "mapping") {
                this.mapping = true;
              }
              if (ScreenNames[i].toLowerCase() == "domain") {
                this.domain = true;
              }
              if (ScreenNames[i].toLowerCase() == "technology") {
                this.technology = true;
              }
              if (ScreenNames[i].toLowerCase() == "registration") {
                this.registration = true;
              }
            }

            let obj = {
              sow: this.sow,
              candidatedetails: this.candidatedetails,
              mapping: this.mapping,
              domain: this.domain,
              technology: this.technology,
              registration: this.registration,
              ChangePassword: this.ChangePW,
            };
            sessionStorage.setItem("toggle", JSON.stringify(obj));
          }
        }
      }
    });
  }

  setAllDefaults() {
    this.sow = false;
    this.candidatedetails = false;
    this.mapping = false;
    this.domain = false;
    this.technology = false;
    this.login = false;
    this.dashboard = false;
    this.registration = false;
    this.ChangePW = false;
  }

  // onclick() {
  //   this.isChecked = !this.isChecked;
  //   this.eventChange.emit(this.isChecked);
  // }

  managePassword() {
    this.managePw = !this.managePw;
    this.managePw1 = false;
    console.log(this.managePw);
  }
  managePassword1() {
    this.managePw = false;
    this.managePw1 = !this.managePw1;
   
    console.log(this.managePw1);
  }

  closeMenuBox() {
    this.isChecked = false;
  }

  handleClick() {
    this.closeMenuBox();
  }
  getUserName(): any {
    let data = sessionStorage.getItem("userData");
    let userInfo = data ? JSON.parse(data) : null;
    return userInfo.LoginName;
  }
}
