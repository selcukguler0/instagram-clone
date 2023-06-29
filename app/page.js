import LeftPanel from "@/components/main/left-panel";
import Main from "@/components/main/main";
import RightPanel from "@/components/main/right-panel";

import styles from "./page.module.scss";

export default function Home() {
  return (
		<div className={styles.container}>
			<LeftPanel />
			<div className={styles.wrapper}>
				<Main />
				<RightPanel />
			</div>
		</div>
	);
}
