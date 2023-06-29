import React from 'react'

export default function Footer() {
	let year = new Date().getFullYear();
	return <span className="footer">© {year} Instagram from Selçuk Güler</span>;
}
