import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class CommonService implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getIdProfileInParams();
  }

  getIdProfileInParams(): number {
    return +this.route.snapshot.firstChild.params.id;
  }
}
