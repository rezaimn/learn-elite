import { FormModule } from './profile.module';

describe('FormModule', () => {
    let formModule: FormModule;

    beforeEach(() => {
        formModule = new FormModule();
    });

    it('should create an instance', () => {
        expect(formModule).toBeTruthy();
    });
});
