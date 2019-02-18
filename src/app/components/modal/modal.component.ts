import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../environments/environment';
import { ElectronService } from "../../providers/electron.service";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public version: any;

  constructor(private electronService: ElectronService, private api: ApiService) { }

  ngOnInit() {
    this.version = this.electronService.version;
  }

  hideModal() {
    document.querySelector('app-modal').setAttribute('hidden', 'true');
  }



}
