import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ClarityModule } from '@clr/angular'
import { ClarityIcons, ellipsisVerticalIcon, starIcon} from '@cds/core/icon';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, ClarityModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '{{APPTITLE}}';
  constructor(){
    ClarityIcons.addIcons(starIcon)
    ClarityIcons.addIcons(ellipsisVerticalIcon)
  }
}
