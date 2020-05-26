import { Component } from '@angular/core';

import { User } from '../user.module';

@Component({
     /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-user',
    templateUrl: './user.component.html'
})

export class UserComponent {

    user: User = {
        id: 1,
        image: 'assets/images/user1.jpg',
        name: 'Sebastián Bellido',
        age: 40,
        educationLevel: 'Academic',
        originality: 2,
        flexibility: 4,
        fluency: 3,
        elaboration: 9,
        ranking: 3,
        points: 25
    };

}
