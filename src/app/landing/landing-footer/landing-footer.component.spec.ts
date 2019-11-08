import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'

import { LandingFooterComponent } from './landing-footer.component'
import {LandingModule} from "../landing.module";

describe('LandingFooterComponent', () => {
  let component: LandingFooterComponent
  let fixture: ComponentFixture<LandingFooterComponent>

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
    fixture = TestBed.createComponent(LandingFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
