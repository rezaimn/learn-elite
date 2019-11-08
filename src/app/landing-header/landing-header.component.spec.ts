import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'

import { LandingHeaderComponent } from './landing-header.component'
import { LayoutModule } from '../../layout.module'
import {LandingModule} from "../landing/landing.module";

describe('LandingHeaderComponent', () => {
  let component: LandingHeaderComponent
  let fixture: ComponentFixture<LandingHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LandingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
