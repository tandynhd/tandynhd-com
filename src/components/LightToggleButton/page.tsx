import "./style.css";

interface LightToggleButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function LightToggleButton({ isDark, onToggle }: LightToggleButtonProps) {
  return (
    <label className="container">
      <input type="checkbox" checked={isDark} onChange={onToggle} />
      <div className="checkmark"></div>
      <div className="torch">
        <div className="light-effect"></div>
        <div className="glow-effect"></div>
        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span> <span></span>
          <span></span>
          <span></span>
          <span></span> <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="smoke">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="head">
          <div className="face top">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="stick">
          <div className="side side-left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="side side-right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </label>
  );
}
