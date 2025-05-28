import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent implements OnInit, OnDestroy {
  breadcrumb$!: Observable<any[]>

  constructor(private bcService: BreadcrumbService){}

  ngOnInit(): void {
    this.breadcrumb$ = this.bcService.breadcrumbs$
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
