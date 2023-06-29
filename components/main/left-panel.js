import Logo from "../instagram-logo";
import Create from "../icons/create";
import Explore from "../icons/explore";
import Home from "../icons/home";
import Messages from "../icons/messages";
import Notification from "../icons/notification";
import Reels from "../icons/reels";
import Search from "../icons/search";
import Settings from "../icons/settings";

import styles from "./main.module.scss"

export default function LeftPanel() {
	return (
		<div className={styles["left-panel"]}>
			<div>
				<Logo width={85} />
				<div className={styles["button-container"]}>
					<button>
						<Home />
						Home
					</button>
					<button>
						<Search />
						Search
					</button>
					<button>
						<Explore />
						Explore
					</button>
					<button>
						<Reels />
						Reels
					</button>
					<button>
						<Messages />
						Messages
					</button>
					<button>
						<Notification />
						Notifications
					</button>
					<button>
						<Create />
						Create
					</button>
					<button>
						<img src="/avatar.jpeg" alt="" />
						Profile
					</button>
				</div>
			</div>
			<button>
				<Settings />
				More
			</button>
		</div>
	);
}
