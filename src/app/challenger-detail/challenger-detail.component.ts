import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Challenger } from '../challenger';
import { Badge } from '../badge';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChallengerService } from '../challenger.service';
import { HeaderService } from '../header.service';

// import * as data from '../leaders.json';

@Component({
  selector: 'app-challenger-detail',
  templateUrl: './challenger-detail.component.html',
  styleUrls: ['./challenger-detail.component.css'],
  // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class ChallengerDetailComponent implements OnInit {

  @Input() challenger: Challenger;

  constructor(
    private route: ActivatedRoute,
    private challengerService: ChallengerService,
    private headerService: HeaderService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    if(!!this.route.snapshot.queryParams.id) {
      this.getChallenger();
    }
    this.headerService.setUrl(window.location.href);
  }

  getChallenger(): void {
    const id = this.route.snapshot.queryParams.id;
    this.challengerService.getChallenger(id)
      .subscribe(challenger => this.challenger = challenger);

    // /** Begin: Local debugging */
    // let local_response = {
    //   name: "test_person",
    //   badges: data.badges
    // }
    // console.log(local_response);
    // /** End: Local debugging */
    // /** Create object to return. Add in all leaders now. */
    // let challenger: Challenger = {
    //   id: id,
    //   name: local_response["name"],
    //   /** 0=casual,1=veteran,2=elite,3=champion */
    //   casualLeaders: local_response["badges"].reduce(function(result, item) {
    //     if (item["type"] === 0) {
    //       let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
    //       let badge: Badge = {
    //         id: item["id"],
    //         name: item["name"],
    //         badgeName: item["badgeName"],
    //         queueOpen: item["queueOpen"],
    //         badgeWon: item["badgeWon"],
    //         twitchName: item["twitchName"],
    //         doubles: item["doubles"],
    //         type: item["type"],
    //         bio: staticBadge.bio,
    //       }
    //       result.push(badge);
    //     }
    //     return result;
    //   }, []),
    //   veteranLeaders: local_response["badges"].reduce(function(result, item) {
    //     if (item["type"] === 1) {
    //       let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
    //       let badge: Badge = {
    //         id: item["id"],
    //         name: item["name"],
    //         badgeName: item["badgeName"],
    //         queueOpen: item["queueOpen"],
    //         badgeWon: item["badgeWon"],
    //         twitchName: item["twitchName"],
    //         doubles: item["doubles"],
    //         type: item["type"],
    //         bio: staticBadge.bio,
    //       }
    //       result.push(badge);
    //     }
    //     return result;
    //   }, []),
    //   elites: local_response["badges"].reduce(function(result, item) {
    //     if (item["type"] === 2) {
    //       let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
    //       let badge: Badge = {
    //         id: item["id"],
    //         name: item["name"],
    //         badgeName: item["badgeName"],
    //         queueOpen: item["queueOpen"],
    //         badgeWon: item["badgeWon"],
    //         twitchName: item["twitchName"],
    //         doubles: item["doubles"],
    //         type: item["type"],
    //         bio: staticBadge.bio,
    //       }
    //       result.push(badge);
    //     }
    //     return result;
    //   }, []),
    //   champions: local_response["badges"].reduce(function(result, item) {
    //     if (item["type"] === 3) {
    //       let staticBadge: Badge = data.badges[data.badges.map(function(e) { return e.id; }).indexOf(item["id"])];
    //       let badge: Badge = {
    //         id: item["id"],
    //         name: item["name"],
    //         badgeName: item["badgeName"],
    //         queueOpen: item["queueOpen"],
    //         badgeWon: item["badgeWon"],
    //         twitchName: item["twitchName"],
    //         doubles: item["doubles"],
    //         type: item["type"],
    //         bio: staticBadge.bio,
    //       }
    //       result.push(badge);
    //     }
    //     return result;
    //   }, []),
    // };

    // challenger.casualLeaders.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
    // challenger.veteranLeaders.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
    // challenger.elites.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);
    // challenger.champions.sort((a, b) => (a.queueOpen === 0) ? 1 : -1);

    // this.challenger = challenger;
  }

  goBack(): void {
    this.location.back();
  }

}
