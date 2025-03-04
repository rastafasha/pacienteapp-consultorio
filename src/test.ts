// This file is required by karma.conf.js and loads all the .spec files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { of } from 'rxjs'; // Import of for mock observables
import { SwUpdate } from '@angular/service-worker'; // Import SwUpdate

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Add necessary providers
getTestBed().configureTestingModule({
  imports: [
    HttpClientModule, // Add HttpClientModule to imports
  ],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        params: of({}), // Mock params observable
        snapshot: { params: {} } // Mock snapshot
      }
    },
    {
      provide: SwUpdate,
      useValue: {} // Mock SwUpdate
    },
    {
      provide: HttpClient, // Add HttpClient provider
      useValue: {} // Mock HttpClient
    },
    // Add other necessary modules or services here
  ],
});

// Manually import the test files using dynamic imports
const testFiles = [
  import('./app/components/citas/citas.component.spec'), // Replace with actual test file names
  // import('./another-example.spec.ts') // Add more test files as needed
];

Promise.all(testFiles).then(() => {
  console.log('All test files loaded successfully.');
}).catch(err => {
  console.error('Error loading test files:', err);
});
