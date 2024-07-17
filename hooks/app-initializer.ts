import { FriendsAndDebt } from "@/shared/friends-and-debt/friends-and-debt";

class AppInitializer {
    protected friendsAndDebt: FriendsAndDebt; 
    
    constructor() {
        this.friendsAndDebt = new FriendsAndDebt();
    }
}