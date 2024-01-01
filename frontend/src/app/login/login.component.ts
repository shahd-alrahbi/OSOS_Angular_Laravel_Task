import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  EmployeeArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  username: string = '';
  password: string = '';
  currentEmployeeID = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.http.get("http://127.0.0.1:8000/api/employees")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
      });
  }

  login() {
    const userFound = this.EmployeeArray.find(employees => employees.username === this.username && employees.password === this.password);
  
    if (userFound) {
      alert('Login Successful');
      this.getAllEmployee();
      this.username = '';
      this.password = '';
    } else {

      alert('Login failed. Please try agin.');
    }
  }
  
  

  save() {
    if (this.currentEmployeeID === '') {
      this.login();
    } else {
      this.UpdateFields();
    }
  }

  Update(data: any) {
    this.username = data.username;
    this.password = data.password;
    this.currentEmployeeID = data.id;
  }

  UpdateFields() {
    let bodyData = {
      "username": this.username,
      "password": this.password,
    };
    this.http.put("http://127.0.0.1:8000/api/update" + "/" + this.currentEmployeeID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Fields Updated")
      this.getAllEmployee();
      this.username = '';
      this.password = '';
    });
  }

  Delete(data: any) {
    this.http.delete("http://127.0.0.1:8000/api/delete" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Fields deleted")
      this.getAllEmployee();
    });
  }
}
