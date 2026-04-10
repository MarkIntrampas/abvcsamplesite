import './404.css'
import { useNavigate } from 'react-router-dom'
import logo from '../Home/media/sec1logo.png'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div id="pg-404">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>
      <div className="accent-line-top"></div>
      <div className="accent-line-bottom"></div>
      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>

      <div className="content-404">
        <div className="logo-wrap">
          <img src={logo} alt="Ale Bosma Ventures Corporation" className="logo-404" />
        </div>

        <div className="label-top">System Error — Page Not Found</div>

        <div className="num-404">404</div>

        <div className="divider-row">
          <div className="divider-line"></div>
          <div className="divider-dot"></div>
          <div className="divider-line"></div>
        </div>

        <div className="err-title">Lost in the System</div>

        <p className="err-sub">
          The page you are looking for does not exist or has been moved.
          Please check the URL or navigate back to safety.
        </p>

        <button className="btn-return" onClick={() => navigate('/')}>
          ← Return Home
        </button>

        <div className="stat-row">
          <div className="stat-cell">
            <div className="stat-v">ERR</div>
            <div className="stat-l">Status</div>
          </div>
          <div className="stat-cell">
            <div className="stat-v">404</div>
            <div className="stat-l">Code</div>
          </div>
          <div className="stat-cell">
            <div className="stat-v">NULL</div>
            <div className="stat-l">Route</div>
          </div>
        </div>
      </div>

      <div className="bottom-code">
        ALE BOSMA VENTURES CORPORATION — ERR_404_NOT_FOUND
      </div>
    </div>
  )
}

export default NotFound
