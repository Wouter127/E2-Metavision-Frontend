import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Weerstation } from 'src/app/interfaces/Weerstation';
import { WeerstationService } from 'src/app/services/weerstation.service';

@Component({
  selector: 'app-weerstation-toevoegen',
  templateUrl: './weerstation-toevoegen.component.html',
  styleUrls: ['./weerstation-toevoegen.component.scss']
})
export class WeerstationToevoegenComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Output() output = new EventEmitter();

  showModal: boolean = false;

  gsmNummer: string = '';

  isSubmitted: boolean = false;
  errorMessage: string = "";

  postWeerstation$: Subscription = new Subscription();

  constructor(private router: Router, private weerstationService: WeerstationService, private toast: HotToastService) {
    // Reverse the order of which the toasts are displayed
    this.toast.defaultConfig = {
      ...this.toast.defaultConfig,
      reverseOrder: true
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postWeerstation$.unsubscribe();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.postWeerstation$ = this.weerstationService.postWeerstation(this.gsmNummer).pipe(
      this.toast.observe({
        loading: { content: 'Toevoegen...', position: 'bottom-right' },
        success: { content: 'Weerstation toegevoegd!', position: 'bottom-right', dismissible: true },
        error: {
          content: (e) => {
            let msg = '<ul>';
            msg += `<li><b>Er ging iets mis!</b></li>`;
            for (let key in e.error.errors) {
              msg += `<li>${e.error.errors[key]}</li>`;
            }
            msg += '</ul>';

            return msg;
          }, position: 'bottom-right', dismissible: true, duration: 5000
        },
      })
    ).subscribe(
      result => {
        this.gsmNummer = '';
        this.closeModal();

        this.output.next(); // Send event to parent component.
      }
    );
  }
}
