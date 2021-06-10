import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { AutorService } from 'src/app/service/autor.service';
import { CreateAutorComponent } from './create-autor/create-autor.component';

@Component({
  selector: 'app-list-autor',
  templateUrl: './list-autor.component.html',
  styleUrls: ['./list-autor.component.css']
})
export class ListAutorComponent implements OnInit {
  autores: any[];
  modalOptions: NgbModalOptions = {};

  constructor(
    private modalService: NgbModal,
    public autorService: AutorService,
    public alertSwal: AlertSwallService
    ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.autorService.getAll().subscribe(res => {
      this.autores = res;
      console.log(res);
    });
  }

  create(){
    const modalRef = this.modalService.open(
      CreateAutorComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Crear Nuevo';

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });
  }

  edit(id: any){
    const modalRef = this.modalService.open(
      CreateAutorComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Editar';
    modalRef.componentInstance.id = id;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });

  }

  eliminar(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
          this.autorService.delete(id).subscribe(
            (data: any) => {
              // console.log(res);
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }
      });
  }

  enable(id: any) {
    this.autorService.enabled(id).subscribe(
      data => {
        this.list();
      },
      error => {
        this.alertSwal.showSwallError(error.error);
        this.list();
      }
    );
  }
}
