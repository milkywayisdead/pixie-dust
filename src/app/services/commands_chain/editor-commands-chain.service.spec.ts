import { TestBed } from '@angular/core/testing';

import { EditorCommandsChain } from './editor-commands-chain.service';

describe('CommandschainService', () => {
  let service: EditorCommandsChain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorCommandsChain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
