import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/interfaces/Gebruiker';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gebruiker!: Gebruiker | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
          this.authService.getGebruiker().subscribe(
            gebruiker => {
              this.gebruiker = gebruiker;
            }
          );
        }
        
      }

