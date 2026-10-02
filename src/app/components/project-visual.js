import { Arrow } from "./icons";

// Decorative illustrations, not scannable codes or application screenshots.
export function CodePattern({ color = true, className = "" }) {
  const colors = color
    ? ["#f04c42", "#3dba7b", "#437cfa", "#fffdf2"]
    : ["#373d2f", "#dce5ce"];
  const cells = [];
  for (let y = 0; y < 25; y++)
    for (let x = 0; x < 25; x++) {
      const inFinder =
        (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
      if (!inFinder)
        cells.push(
          <rect
            key={`${x}-${y}`}
            x={x * 4}
            y={y * 4}
            width={color ? 4 : 3}
            height={color ? 4 : 3}
            rx={color ? 0 : 1.5}
            fill={
              colors[(x * 13 + y * 7 + x * y * 3 + (x ^ y)) % colors.length]
            }
          />,
        );
    }
  return (
    <svg className={className} viewBox="-6 -6 112 112" aria-hidden="true">
      <rect
        x="-6"
        y="-6"
        width="112"
        height="112"
        rx="1"
        fill={color ? "#fffdf2" : "#dce5ce"}
      />
      {cells}
      {[
        [0, 0],
        [72, 0],
        [0, 72],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width="28"
            height="28"
            rx={color ? 0 : 7}
            fill="#24251f"
          />
          <rect
            x={x + 4}
            y={y + 4}
            width="20"
            height="20"
            rx={color ? 0 : 5}
            fill={color ? "#fffdf2" : "#dce5ce"}
          />
          <rect
            x={x + 8}
            y={y + 8}
            width="12"
            height="12"
            rx={color ? 0 : 3}
            fill="#24251f"
          />
        </g>
      ))}
    </svg>
  );
}

export function ProjectVisual({ slug }) {
  return (
    <div className={`project-visual visual-${slug}`} aria-hidden="true">
      {slug === "quadqr" && (
        <>
          <span className="visual-label mono">A NEW ALPHABET FOR DATA</span>
          <div className="quad-composition">
            <div className="quad-shadow" />
            <CodePattern className="quad-pattern" />
          </div>
          <div className="color-key mono">
            <span>
              <i style={{ background: "#f04c42" }} />
              00
            </span>
            <span>
              <i style={{ background: "#3dba7b" }} />
              01
            </span>
            <span>
              <i style={{ background: "#437cfa" }} />
              10
            </span>
            <span>
              <i style={{ background: "#fffdf2" }} />
              11
            </span>
          </div>
          <span className="visual-bottom mono">
            RGBW / 2 BITS PER DATA CELL
          </span>
        </>
      )}
      {slug === "quadqr-sdk" && (
        <>
          <span className="visual-label mono">
            THE SAME IDEA. NATIVE SPEED.
          </span>
          <div className="sdk-terminal">
            <div className="terminal-top">
              <i />
              <i />
              <i />
              <span className="mono">quadqr / lib.rs</span>
            </div>
            <pre>
              <span className="code-muted">
                {"// build beyond the browser"}
              </span>
              {"\n"}
              <span className="code-orange">use</span>
              {" quadqr::{\n  encode_text, decode_matrix\n};\n\n"}
              <span className="code-orange">let</span>
              {" code = encode_text(\n  "}
              <span className="code-green">{'"Hello, possibility."'}</span>
              {"\n);"}
            </pre>
            <div className="terminal-platforms mono">
              RUST <span>→</span> ANDROID · FLUTTER · WASM
            </div>
          </div>
          <span className="visual-bottom mono">
            ONE CORE / MULTIPLE PLATFORMS
          </span>
        </>
      )}
      {slug === "sharex" && (
        <>
          <span className="visual-label mono">
            LESS FRICTION. MORE CONNECTION.
          </span>
          <div className="share-diagram">
            <div className="device device-phone">
              <div className="device-content">
                <span className="mono">ShareX</span>
                <span className="file-icon">↗</span>
                <span className="mono">ready to send</span>
              </div>
            </div>
            <div className="transfer-line">
              <span />
              <Arrow />
              <span />
            </div>
            <div className="device device-laptop">
              <div className="device-content">
                <span className="mono">192.168.1.4</span>
                <div className="file-row">
                  <span>↳</span>
                  <span>ideas.zip</span>
                  <b>✓</b>
                </div>
                <div className="transfer-progress" />
                <span className="mono">all yours.</span>
              </div>
            </div>
          </div>
          <span className="visual-bottom mono">YOUR FILES / YOUR NETWORK</span>
        </>
      )}
      {slug === "dezk" && (
        <>
          <span className="visual-label mono">YOUR DESK, IN YOUR POCKET.</span>
          <div className="dezk-phone">
            <div className="phone-camera" />
            <div className="phone-heading">
              dezk<span>● connected</span>
            </div>
            <div className="trackpad">
              <span>↖</span>
              <small className="mono">MOVE. TAP. CONTROL.</small>
            </div>
            <div className="phone-keys">
              <span>⌘</span>
              <span>⌨</span>
              <span>↗</span>
            </div>
            <div className="volume-line">
              <span />
            </div>
          </div>
          <span className="visual-bottom mono">
            ANDROID / PC REMOTE CONTROL
          </span>
        </>
      )}
      {slug === "qrsmith" && (
        <>
          <span className="visual-label mono">FUNCTION, WITH PERSONALITY.</span>
          <div className="smith-composition">
            <CodePattern color={false} />
            <div className="smith-note mono">
              a familiar form.
              <br />
              your own signature.<span>↗</span>
            </div>
          </div>
          <span className="visual-bottom mono">
            PATTERNS / LOGOS / POSSIBILITIES
          </span>
        </>
      )}
      {slug === "promptvault" && (
        <>
          <span className="visual-label mono">
            KEEP THE PROMPT. BUILD THE POSSIBILITY.
          </span>
          <div className="vault-stack">
            <div className="vault-sheet mono">
              <span>01 / YOUR LIBRARY</span>
              <p>Ideas worth keeping.</p>
              <code>{"{ context, intent, output }"}</code>
            </div>
            <div className="vault-sheet mono">
              <span>02 / MAKE IT YOURS</span>
              <p>Refine. Reuse. Repeat.</p>
              <code>{"prompt → experiment → insight"}</code>
            </div>
          </div>
          <span className="visual-bottom mono">OFFLINE FIRST / ANDROID</span>
        </>
      )}
      {slug === "jewelry-try-on" && (
        <>
          <span className="visual-label mono">
            FROM LANDMARKS TO A LIVE FIT
          </span>
          <svg className="tryon-hand" viewBox="0 0 360 270">
            <path
              d="M120 255L101 196 65 153Q56 140 66 130Q74 120 88 133L119 157 105 64Q102 48 114 46Q128 44 131 60L148 139 143 34Q142 19 155 19Q169 19 169 35L179 137 180 47Q181 32 194 35Q206 38 205 52L205 145 215 80Q218 66 230 70Q241 73 238 88L229 187 211 255"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <g fill="none" stroke="currentColor" strokeWidth=".8" opacity=".6">
              <path d="M157 218L117 159 66 133M157 218L144 142 123 99 114 51M157 218L166 138 160 79 155 25M157 218L198 142 198 92 194 41M157 218L219 178 226 132 228 78M117 159L144 142 166 138 198 142 219 178" />
            </g>
            {[
              [157, 218],
              [117, 159],
              [66, 133],
              [144, 142],
              [123, 99],
              [114, 51],
              [166, 138],
              [160, 79],
              [155, 25],
              [198, 142],
              [198, 92],
              [194, 41],
              [219, 178],
              [226, 132],
              [228, 78],
            ].map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="3"
                fill="currentColor"
              />
            ))}
            <ellipse
              cx="164"
              cy="112"
              rx="20"
              ry="9"
              fill="none"
              stroke="#dca85c"
              strokeWidth="6"
              transform="rotate(-4 164 112)"
            />
            <path d="M177 104L270 80H323" fill="none" stroke="#dca85c" />
            <text
              x="266"
              y="70"
              fill="currentColor"
              fontSize="10"
              fontFamily="monospace"
            >
              TRACK → FIT
            </text>
          </svg>
          <span className="visual-bottom mono">
            HAND TRACKING / 3D / OCCLUSION
          </span>
        </>
      )}
      {slug === "diamond-catalog" && (
        <>
          <span className="visual-label mono">
            TURNING FEEDS INTO A STOREFRONT
          </span>
          <div className="catalog-diagram">
            <span className="catalog-number">
              100k<span>+</span>
            </span>
            <p className="mono">DIAMOND SKUS / ONE PIPELINE</p>
            <div className="catalog-pipeline mono">
              <span>
                INGEST
                <br />
                <small>vendor feeds</small>
              </span>
              <b>→</b>
              <span>
                NORMALIZE
                <br />
                <small>validated data</small>
              </span>
              <b>→</b>
              <span>
                INDEX
                <br />
                <small>ready to find</small>
              </span>
            </div>
          </div>
          <span className="visual-bottom mono">
            BATCHES / BACKGROUND JOBS / SEARCH
          </span>
        </>
      )}
      {slug === "jewelry-ecommerce" && (
        <>
          <span className="visual-label mono">
            ENGINEERING THE CONSIDERED PURCHASE
          </span>
          <div className="commerce-illustration">
            <svg viewBox="0 0 180 170">
              <ellipse
                cx="88"
                cy="106"
                rx="48"
                ry="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
              />
              <path
                d="M88 13L112 39 88 68 64 39Z M64 39H112 M88 13V68"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div className="commerce-steps mono">
              <span>01 / THE SETTING</span>
              <span>02 / THE DIAMOND</span>
              <span>
                03 / YOUR RING <b>↗</b>
              </span>
            </div>
          </div>
          <span className="visual-bottom mono">
            CUSTOM CONFIGURATION / WOOCOMMERCE
          </span>
        </>
      )}
    </div>
  );
}
