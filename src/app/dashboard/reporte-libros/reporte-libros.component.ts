import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { AutorService } from 'src/app/service/autor.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { LibroService } from 'src/app/service/libro.service';
import { environment } from 'src/environments/environment.prod';
import { PrestamoLibroComponent } from '../prestamo-libro/prestamo-libro.component';

@Component({
  selector: 'app-reporte-libros',
  templateUrl: './reporte-libros.component.html',
  styleUrls: ['./reporte-libros.component.css']
})
export class ReporteLibrosComponent implements OnInit {
  libros: any[] = [];
  formGroup: FormGroup;
  url = environment.imgUrl;
  urlPdf = environment.pdfUrl;

  autores: any[];
  categorias: any[];
  coleciones: any[];

  librosReservados: any[] = [];

  busqueda$ = new Subject();

  modalOptions: NgbModalOptions = {};

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public libroService: LibroService,
    public categoriaService: CategoriaService,
    public authService: AuthService,
    public autorService: AutorService
  ) {
    this.formGroup = this.formBuilder.group({
      titulo: '', // quitar
      autor_id: '',
      categoria_id: ''
    });
    this.listCategorias();
    this.listAutores();
    this.librosReservados = JSON.parse(localStorage.getItem('libros'));
    if (!this.librosReservados) {
      localStorage.setItem('libros', JSON.stringify(this.libros));
    }
  }

  ngOnInit(): void {
    this.list(this.formGroup.value);
    this.formGroup.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          console.log(value);
          return this.libroService.findLibros(value);
        })
      )
      .subscribe((res: any[]) => {
        // console.log('libros: ', res);
        this.libros = res;
        // console.log('libro localStorage:',JSON.parse(localStorage.getItem('libros')));
        // this.librosReservados = JSON.parse(localStorage.getItem('libros'));
      });
    // this.authService.logout();
    this.listLibroReserba();
  }

  ngOnDestroy(): void {
    this.busqueda$.unsubscribe();
  }

  list(data: any) {
    this.libroService.findLibros(data).subscribe(res => {
      this.libros = res;
      console.log('libros', res);
    });
  }

  listCategorias(){
    this.categoriaService.getEnabledList().subscribe(res => {
      this.categorias = res;
      console.log(res);
    });
  }

  listAutores(){
    this.autorService.getEnabledList().subscribe(res => {
      this.autores = res;
      console.log(res);
    });
  }

  listLibroReserba() {
    this.librosReservados = JSON.parse(localStorage.getItem('libros'));
  }

  quitarLibroReserba(id: any){
    console.log(JSON.parse(localStorage.getItem('libros')));
    this.librosReservados = JSON.parse(localStorage.getItem('libros'));
    for (let index = 0; index <  this.librosReservados.length; index++) {
      if (this.librosReservados[index].id === id) {
        this.librosReservados.splice(index,1);
      }
    }
    localStorage.setItem('libros', JSON.stringify(this.librosReservados));
  }

  agregarLibroReserba(libro: any){
    console.log(libro);
    let siHayLibro = true;
    if(libro.estado == 0){
      this.librosReservados = JSON.parse(localStorage.getItem('libros'));
      if(this.librosReservados.length < 3){
        for (let index = 0; index <  this.librosReservados.length; index++) {
          if (this.librosReservados[index].id == libro.id) {
            siHayLibro = false;
          }
        }
        if (siHayLibro) {
          this.librosReservados.push(libro);
        }
        localStorage.setItem('libros', JSON.stringify(this.librosReservados));
      }
    }
  }

  registrarPrestamo(){
    const modalRef = this.modalService.open(
      PrestamoLibroComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Relizar la Reserba';

    modalRef.result.then(result => {
      if (result) {
        this.list(this.formGroup.value);
        this.listLibroReserba();
      }
    });

  }
}
