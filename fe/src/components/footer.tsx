

export function Footer(){
    return(
        <footer className="footer bg-zinc-200 sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <div className="text-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by <b>Arcbit</b></p>
            </div>
        </footer>
    )
}