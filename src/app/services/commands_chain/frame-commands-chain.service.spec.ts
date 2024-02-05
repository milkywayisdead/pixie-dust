import { TestBed } from '@angular/core/testing';

import { FrameCommandsChain } from './frame-commands-chain.service';

describe('FrameCommandChainService', () => {
  let service: FrameCommandsChain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameCommandsChain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
