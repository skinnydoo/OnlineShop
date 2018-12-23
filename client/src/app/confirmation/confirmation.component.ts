import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Defines the component responsible to manage the confirmation page.
 */
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent implements OnInit {

  name: string;
  confirmationNumber: string;

  /**
   * Initializes a new instance of the ConfirmationComponent class.
   *
   * @param route     The active route.
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.confirmationNumber = this.route.snapshot.params['confirmationNumber'];
  }
}
