import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from './appointment.service';
import { AuthService } from './auth.service';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppointmentService, AuthService]
    });
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests for the service methods as needed
});
