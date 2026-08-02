import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000';

/* ═══════════════════════════════════════════════════════════
   SECTION 1 – JavaScript Fundamentals Showcase
   ═══════════════════════════════════════════════════════════ */

const JS_EXAMPLES = [
  {
    id: 'functions',
    title: 'Functions',
    description: 'Declaration, arrow, and higher-order functions',
    code: `// Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow Function
const square = (n) => n * n;

// Higher-Order Function
const applyTwice = (fn, value) => fn(fn(value));

console.log(greet("Tirth"));
console.log("Square of 5:", square(5));
console.log("Square applied twice on 3:", applyTwice(square, 3));`,
    run: () => {
      const greet = (name) => "Hello, " + name + "!";
      const square = (n) => n * n;
      const applyTwice = (fn, value) => fn(fn(value));
      return [
        greet("Tirth"),
        `Square of 5: ${square(5)}`,
        `Square applied twice on 3: ${applyTwice(square, 3)}`
      ];
    }
  },
  {
    id: 'objects',
    title: 'Objects & Destructuring',
    description: 'Object creation, destructuring, and spread operator',
    code: `// Object Creation
const student = {
  name: "Tirth",
  branch: "AI & ML",
  semester: 5,
  skills: ["JavaScript", "React", "Node.js"]
};

// Destructuring
const { name, branch, ...rest } = student;

// Spread Operator
const updatedStudent = {
  ...student,
  semester: 6,
  gpa: 9.2
};

console.log("Name:", name);
console.log("Branch:", branch);
console.log("Rest:", JSON.stringify(rest));
console.log("Updated:", JSON.stringify(updatedStudent, null, 2));`,
    run: () => {
      const student = { name: "Tirth", branch: "AI & ML", semester: 5, skills: ["JavaScript", "React", "Node.js"] };
      const { name, branch, ...rest } = student;
      const updatedStudent = { ...student, semester: 6, gpa: 9.2 };
      return [
        `Name: ${name}`,
        `Branch: ${branch}`,
        `Rest: ${JSON.stringify(rest)}`,
        `Updated: ${JSON.stringify(updatedStudent, null, 2)}`
      ];
    }
  },
  {
    id: 'arrays',
    title: 'Array Methods',
    description: 'map, filter, reduce, and find in action',
    code: `const tasks = [
  { id: 1, title: "Learn React", completed: true },
  { id: 2, title: "Build API", completed: false },
  { id: 3, title: "Write Tests", completed: true },
  { id: 4, title: "Deploy App", completed: false }
];

// map – extract titles
const titles = tasks.map(t => t.title);

// filter – only completed tasks
const done = tasks.filter(t => t.completed);

// reduce – count completed
const completedCount = tasks.reduce(
  (count, t) => t.completed ? count + 1 : count, 0
);

// find – first pending
const firstPending = tasks.find(t => !t.completed);

console.log("All titles:", titles);
console.log("Completed:", done.map(t => t.title));
console.log("Completed count:", completedCount);
console.log("First pending:", firstPending.title);`,
    run: () => {
      const tasks = [
        { id: 1, title: "Learn React", completed: true },
        { id: 2, title: "Build API", completed: false },
        { id: 3, title: "Write Tests", completed: true },
        { id: 4, title: "Deploy App", completed: false }
      ];
      const titles = tasks.map(t => t.title);
      const done = tasks.filter(t => t.completed);
      const completedCount = tasks.reduce((c, t) => t.completed ? c + 1 : c, 0);
      const firstPending = tasks.find(t => !t.completed);
      return [
        `All titles: [${titles.map(t => `"${t}"`).join(', ')}]`,
        `Completed: [${done.map(t => `"${t.title}"`).join(', ')}]`,
        `Completed count: ${completedCount}`,
        `First pending: ${firstPending.title}`
      ];
    }
  },
  {
    id: 'async',
    title: 'Async / Await',
    description: 'Promises, async functions, and error handling',
    code: `// Simulating an API call with Promise
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ status: 200, data: "Hello from async!" });
  }, 1000);
});

// Using async/await
async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log("Status:", result.status);
  console.log("Data:", result.data);
}

// Error handling with try/catch
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch (err) {
    console.log("Error:", err.message);
  }
}

getData();`,
    run: () => {
      return [
        'Fetching...',
        'Status: 200',
        'Data: Hello from async!',
        '',
        '// async/await pattern:',
        'const result = await fetchData();',
        '// Replaces .then() chains with cleaner syntax',
        '// try/catch handles errors gracefully'
      ];
    }
  }
];

function JsFundamentals() {
  const [activeExample, setActiveExample] = useState('functions');
  const [output, setOutput] = useState(null);

  const currentExample = JS_EXAMPLES.find(e => e.id === activeExample);

  const handleRun = () => {
    const result = currentExample.run();
    setOutput(result);
  };

  return (
    <div className="api-explorer-section">
      <div className="section-label">
        <span className="section-number">01</span>
        <h3>JavaScript Fundamentals</h3>
      </div>
      <p className="section-desc">
        Core JavaScript concepts: functions, objects, arrays, and async patterns — the building blocks of modern web development.
      </p>

      <div className="js-tabs">
        {JS_EXAMPLES.map(ex => (
          <button
            key={ex.id}
            className={`js-tab ${activeExample === ex.id ? 'active' : ''}`}
            onClick={() => { setActiveExample(ex.id); setOutput(null); }}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div className="js-demo-container">
        <div className="js-code-panel">
          <div className="code-panel-header">
            <span className="code-lang-badge">JavaScript</span>
            <span className="code-filename">{currentExample.id}.js</span>
          </div>
          <pre className="code-block"><code>{currentExample.code}</code></pre>
          <button className="run-btn" onClick={handleRun}>
            ▶ Run Code
          </button>
        </div>

        <div className="js-output-panel">
          <div className="code-panel-header">
            <span className="code-lang-badge output-badge">Console Output</span>
          </div>
          <div className="console-output">
            {output ? (
              output.map((line, i) => (
                <div key={i} className="console-line">
                  <span className="console-prompt">&gt;</span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              <div className="console-placeholder">
                Click "Run Code" to see the output...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   SECTION 2 – HTTP Methods & Status Codes
   ═══════════════════════════════════════════════════════════ */

const HTTP_METHODS = [
  {
    method: 'GET',
    color: '#10b981',
    description: 'Retrieve a resource or collection. Safe and idempotent.',
    endpoint: '/api/tasks',
    tryIt: async () => {
      const res = await fetch(`${API_BASE}/api/tasks`);
      return { status: res.status, body: await res.json() };
    }
  },
  {
    method: 'POST',
    color: '#f59e0b',
    description: 'Create a new resource. Returns 201 Created with Location header.',
    endpoint: '/api/tasks',
    tryIt: async () => {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Demo Task ' + Date.now(), description: 'Created from API Explorer' })
      });
      return { status: res.status, location: res.headers.get('Location'), body: await res.json() };
    }
  },
  {
    method: 'PUT',
    color: '#3b82f6',
    description: 'Full replacement of a resource. Idempotent.',
    endpoint: '/api/tasks/:id',
    tryIt: async () => {
      const res = await fetch(`${API_BASE}/api/tasks/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated via PUT', description: 'Full update', completed: true })
      });
      return { status: res.status, body: await res.json() };
    }
  },
  {
    method: 'PATCH',
    color: '#8b5cf6',
    description: 'Partial update of a resource. Only sends changed fields.',
    endpoint: '/api/tasks/:id',
    tryIt: async () => {
      const res = await fetch(`${API_BASE}/api/tasks/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: false })
      });
      return { status: res.status, body: await res.json() };
    }
  },
  {
    method: 'DELETE',
    color: '#ef4444',
    description: 'Remove a resource. Idempotent.',
    endpoint: '/api/tasks/:id',
    tryIt: async () => {
      const createRes = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Task to delete' })
      });
      const created = await createRes.json();
      const taskId = created.id;
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, { method: 'DELETE' });
      return { status: res.status, body: await res.json() };
    }
  }
];

const STATUS_CODES = [
  { code: 200, text: 'OK', category: '2xx', desc: 'Request succeeded', used: 'GET, PUT, PATCH, DELETE' },
  { code: 201, text: 'Created', category: '2xx', desc: 'Resource created successfully', used: 'POST' },
  { code: 204, text: 'No Content', category: '2xx', desc: 'Success with no response body', used: 'Alternate DELETE' },
  { code: 400, text: 'Bad Request', category: '4xx', desc: 'Invalid request body or parameters', used: 'POST, PUT, PATCH' },
  { code: 404, text: 'Not Found', category: '4xx', desc: 'Resource does not exist', used: 'GET, PUT, PATCH, DELETE' },
  { code: 500, text: 'Internal Server Error', category: '5xx', desc: 'Unexpected server failure', used: 'Any endpoint' }
];

function HttpMethodsSection() {
  const [tryResult, setTryResult] = useState(null);
  const [tryLoading, setTryLoading] = useState(null);
  const [tryError, setTryError] = useState(null);

  const handleTryIt = async (method) => {
    setTryLoading(method.method);
    setTryError(null);
    setTryResult(null);
    try {
      const result = await method.tryIt();
      setTryResult({ method: method.method, ...result });
    } catch (err) {
      setTryError('Backend offline. Run: npm run server');
    } finally {
      setTryLoading(null);
    }
  };

  return (
    <div className="api-explorer-section">
      <div className="section-label">
        <span className="section-number">02</span>
        <h3>HTTP Methods & Status Codes</h3>
      </div>
      <p className="section-desc">
        RESTful APIs use standard HTTP methods to perform CRUD operations. Each method has specific semantics, idempotency rules, and expected status codes.
      </p>

      <div className="http-methods-grid">
        {HTTP_METHODS.map(m => (
          <div key={m.method} className="http-method-card">
            <div className="method-card-header">
              <span className="method-badge" style={{ backgroundColor: m.color }}>
                {m.method}
              </span>
              <code className="method-endpoint">{m.endpoint}</code>
            </div>
            <p className="method-desc">{m.description}</p>
            <button
              className="try-it-btn"
              onClick={() => handleTryIt(m)}
              disabled={tryLoading === m.method}
              style={{ borderColor: m.color, color: m.color }}
            >
              {tryLoading === m.method ? 'Sending...' : 'Try It'}
            </button>
          </div>
        ))}
      </div>

      {tryError && (
        <div className="try-result-panel error-result">
          <span className="try-error-icon">[!]</span> {tryError}
        </div>
      )}

      {tryResult && (
        <div className="try-result-panel">
          <div className="try-result-header">
            <span className="method-badge" style={{
              backgroundColor: HTTP_METHODS.find(m => m.method === tryResult.method)?.color
            }}>
              {tryResult.method}
            </span>
            <span className={`status-code-badge ${tryResult.status < 400 ? 'success' : 'error'}`}>
              {tryResult.status}
            </span>
            {tryResult.location && (
              <span className="location-header">
                Location: {tryResult.location}
              </span>
            )}
          </div>
          <pre className="try-result-body">
            {JSON.stringify(tryResult.body, null, 2)}
          </pre>
        </div>
      )}

      <h4 className="subsection-title">Status Codes Reference</h4>
      <div className="status-codes-table-wrap">
        <table className="status-codes-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Used By</th>
            </tr>
          </thead>
          <tbody>
            {STATUS_CODES.map(sc => (
              <tr key={sc.code}>
                <td>
                  <span className={`status-code-pill ${sc.category}`}>
                    {sc.code}
                  </span>
                </td>
                <td className="sc-name">{sc.text}</td>
                <td className="sc-cat">{sc.category}</td>
                <td>{sc.desc}</td>
                <td className="sc-used">{sc.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   SECTION 3 – Richardson Maturity Model
   ═══════════════════════════════════════════════════════════ */

const MATURITY_LEVELS = [
  {
    level: 0,
    title: 'The Swamp of POX',
    subtitle: 'Single endpoint, single verb',
    icon: 'L0',
    description: 'All operations go to one URL using one HTTP method (typically POST). The body describes the operation. Like RPC over HTTP.',
    example: `POST /api
{
  "action": "getTasks"
}

POST /api
{
  "action": "createTask",
  "title": "New Task"
}`,
    ourApi: false,
    tag: 'Not our approach'
  },
  {
    level: 1,
    title: 'Resources',
    subtitle: 'Individual URIs for resources',
    icon: 'L1',
    description: 'Each resource gets its own URI. Instead of describing "what" to do in the body, you target the right URL. But still might use only POST.',
    example: `POST /api/tasks          → List tasks
POST /api/tasks/1        → Get task 1
POST /api/tasks/create   → Create task`,
    ourApi: true,
    tag: 'Yes — /api/tasks, /api/tasks/:id'
  },
  {
    level: 2,
    title: 'HTTP Verbs',
    subtitle: 'Proper use of GET, POST, PUT, DELETE',
    icon: 'L2',
    description: 'Use HTTP methods correctly: GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing. Plus proper status codes (201, 404, etc.).',
    example: `GET    /api/tasks       → 200 OK
POST   /api/tasks       → 201 Created
PUT    /api/tasks/1     → 200 OK
PATCH  /api/tasks/1     → 200 OK
DELETE /api/tasks/1     → 200 OK
GET    /api/tasks/999   → 404 Not Found`,
    ourApi: true,
    tag: 'Yes — Our API implements this'
  },
  {
    level: 3,
    title: 'Hypermedia (HATEOAS)',
    subtitle: 'Responses include navigational links',
    icon: 'L3',
    description: 'Responses include _links that tell the client what actions are available and how to navigate the API — no need to hardcode URLs. This is the "glory of REST."',
    example: `GET /api/tasks/1 → 200 OK
{
  "id": 1,
  "title": "Learn HATEOAS",
  "completed": false,
  "_links": {
    "self":   { "href": "/api/tasks/1", "method": "GET" },
    "update": { "href": "/api/tasks/1", "method": "PUT" },
    "delete": { "href": "/api/tasks/1", "method": "DELETE" },
    "collection": { "href": "/api/tasks", "method": "GET" }
  }
}`,
    ourApi: true,
    tag: 'Yes — Our API implements this!'
  }
];

function RichardsonModel() {
  const [expandedLevel, setExpandedLevel] = useState(null);

  return (
    <div className="api-explorer-section">
      <div className="section-label">
        <span className="section-number">03</span>
        <h3>Richardson Maturity Model</h3>
      </div>
      <p className="section-desc">
        Leonard Richardson's model classifies REST APIs into 4 levels of maturity. Each level builds on the previous, moving from ad-hoc RPC towards true RESTful design.
      </p>

      <div className="rmm-timeline">
        {MATURITY_LEVELS.map(level => (
          <div
            key={level.level}
            className={`rmm-card ${level.ourApi ? 'rmm-implemented' : 'rmm-not-implemented'} ${expandedLevel === level.level ? 'rmm-expanded' : ''}`}
            onClick={() => setExpandedLevel(expandedLevel === level.level ? null : level.level)}
          >
            <div className="rmm-card-top">
              <div className="rmm-level-indicator">
                <span className="rmm-icon">{level.icon}</span>
                <span className="rmm-level-num">Level {level.level}</span>
              </div>
              <div className="rmm-card-title">
                <h4>{level.title}</h4>
                <span className="rmm-subtitle">{level.subtitle}</span>
              </div>
              <span className={`rmm-tag ${level.ourApi ? 'rmm-tag-yes' : 'rmm-tag-no'}`}>
                {level.tag}
              </span>
            </div>

            {expandedLevel === level.level && (
              <div className="rmm-card-details">
                <p>{level.description}</p>
                <pre className="code-block rmm-code"><code>{level.example}</code></pre>
              </div>
            )}

            <div className="rmm-expand-hint">
              {expandedLevel === level.level ? '▲ Collapse' : '▼ Click to expand'}
            </div>
          </div>
        ))}
      </div>

      <div className="rmm-progress">
        <div className="rmm-progress-label">Our API Maturity</div>
        <div className="rmm-progress-bar">
          <div className="rmm-progress-fill" style={{ width: '100%' }}></div>
        </div>
        <div className="rmm-progress-levels">
          <span>Level 0</span>
          <span>Level 1</span>
          <span>Level 2</span>
          <span className="rmm-current">Level 3 (Current)</span>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   SECTION 4 – HATEOAS Deep Dive
   ═══════════════════════════════════════════════════════════ */

function HateoasSection() {
  const [liveResponse, setLiveResponse] = useState(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [followedResponse, setFollowedResponse] = useState(null);

  const fetchLiveDemo = async () => {
    setLiveLoading(true);
    setLiveError(null);
    setSelectedLink(null);
    setFollowedResponse(null);
    try {
      const res = await fetch(`${API_BASE}/api/tasks`);
      const data = await res.json();
      setLiveResponse(data);
    } catch {
      setLiveError('Backend offline. Run: npm run server');
    } finally {
      setLiveLoading(false);
    }
  };

  const followLink = async (linkName, link) => {
    setSelectedLink(linkName);
    try {
      const res = await fetch(link.href, { method: link.method });
      const data = await res.json();
      setFollowedResponse({ status: res.status, body: data });
    } catch {
      setFollowedResponse({ status: 'ERR', body: { error: 'Could not follow link' } });
    }
  };

  const beforeJson = `{
  "id": 1,
  "title": "Learn Node.js & Express",
  "description": "Understand core modules...",
  "completed": true,
  "createdAt": "2025-01-15T10:30:00Z"
}

// Client must hardcode URLs:
// fetch("/api/tasks/1")   → How does client know this?
// fetch("/api/tasks")     → Hardcoded in frontend`;

  const afterJson = `{
  "id": 1,
  "title": "Learn Node.js & Express",
  "description": "Understand core modules...",
  "completed": true,
  "createdAt": "2025-01-15T10:30:00Z",
  "_links": {
    "self":       { "href": "/api/tasks/1", "method": "GET" },
    "update":     { "href": "/api/tasks/1", "method": "PUT" },
    "patch":      { "href": "/api/tasks/1", "method": "PATCH" },
    "delete":     { "href": "/api/tasks/1", "method": "DELETE" },
    "collection": { "href": "/api/tasks",   "method": "GET" }
  }
}

// Client discovers URLs from response!
// const updateUrl = task._links.update.href;`;

  return (
    <div className="api-explorer-section">
      <div className="section-label">
        <span className="section-number">04</span>
        <h3>HATEOAS Deep Dive</h3>
      </div>
      <p className="section-desc">
        <strong>H</strong>ypermedia <strong>A</strong>s <strong>T</strong>he <strong>E</strong>ngine <strong>O</strong>f <strong>A</strong>pplication <strong>S</strong>tate — 
        the API tells clients what they can do next through embedded links, just like web pages have clickable links.
      </p>

      <h4 className="subsection-title">Before vs After HATEOAS</h4>
      <div className="hateoas-comparison">
        <div className="hateoas-panel hateoas-before">
          <div className="hateoas-panel-header">
            <span className="hateoas-label bad">Without HATEOAS</span>
          </div>
          <pre className="code-block"><code>{beforeJson}</code></pre>
        </div>
        <div className="hateoas-panel hateoas-after">
          <div className="hateoas-panel-header">
            <span className="hateoas-label good">With HATEOAS</span>
          </div>
          <pre className="code-block"><code>{afterJson}</code></pre>
        </div>
      </div>

      <h4 className="subsection-title">Live Demo — Follow the Links</h4>
      <p className="section-desc" style={{ marginBottom: '1rem' }}>
        Fetch tasks from the backend and click on any <code>_link</code> to follow it — experience HATEOAS-driven navigation in action.
      </p>

      <button className="run-btn hateoas-fetch-btn" onClick={fetchLiveDemo} disabled={liveLoading}>
        {liveLoading ? 'Fetching...' : 'Fetch /api/tasks'}
      </button>

      {liveError && (
        <div className="try-result-panel error-result" style={{ marginTop: '1rem' }}>
          <span className="try-error-icon">[!]</span> {liveError}
        </div>
      )}

      {liveResponse && (
        <div className="hateoas-live-demo">
          <div className="hateoas-response-card">
            <div className="code-panel-header">
              <span className="code-lang-badge">Response</span>
              <span className="status-code-badge success">200 OK</span>
            </div>

            {liveResponse._links && (
              <div className="hateoas-links-section">
                <span className="hateoas-links-label">Collection _links:</span>
                <div className="hateoas-link-buttons">
                  {Object.entries(liveResponse._links).map(([name, link]) => (
                    <button
                      key={name}
                      className={`hateoas-link-btn ${selectedLink === `collection-${name}` ? 'active' : ''}`}
                      onClick={() => followLink(`collection-${name}`, link)}
                    >
                      <span className="method-mini-badge">{link.method}</span>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {liveResponse.data && liveResponse.data.length > 0 && liveResponse.data[0]._links && (
              <div className="hateoas-links-section">
                <span className="hateoas-links-label">Task #{liveResponse.data[0].id} _links:</span>
                <div className="hateoas-link-buttons">
                  {Object.entries(liveResponse.data[0]._links).map(([name, link]) => (
                    <button
                      key={name}
                      className={`hateoas-link-btn ${selectedLink === `task-${name}` ? 'active' : ''}`}
                      onClick={() => followLink(`task-${name}`, link)}
                    >
                      <span className="method-mini-badge">{link.method}</span>
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {followedResponse && (
            <div className="hateoas-followed-response">
              <div className="code-panel-header">
                <span className="code-lang-badge">Followed Link: {selectedLink}</span>
                <span className={`status-code-badge ${followedResponse.status < 400 ? 'success' : 'error'}`}>
                  {followedResponse.status}
                </span>
              </div>
              <pre className="try-result-body">
                {JSON.stringify(followedResponse.body, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="hateoas-benefits">
        <h4 className="subsection-title">Why HATEOAS Matters</h4>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">//</span>
            <h5>Discoverability</h5>
            <p>Clients discover available actions from responses, no documentation needed for navigation.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">&lt;&gt;</span>
            <h5>Loose Coupling</h5>
            <p>URL structures can change without breaking clients — they follow links, not hardcoded paths.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">{}</span>
            <h5>Self-Describing</h5>
            <p>Each response describes what the client can do next, making the API its own documentation.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">++</span>
            <h5>Evolvability</h5>
            <p>New resources and actions can be added without breaking existing clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export default function ApiExplorer() {
  const [activeSection, setActiveSection] = useState('all');

  const sections = [
    { id: 'all', label: 'All Sections' },
    { id: 'js', label: 'JS Fundamentals' },
    { id: 'http', label: 'HTTP Methods' },
    { id: 'rmm', label: 'Richardson Model' },
    { id: 'hateoas', label: 'HATEOAS' }
  ];

  return (
    <section className="api-explorer-page">
      <div className="section-header">
        <h2>API Explorer</h2>
        <p className="subtitle">
          Interactive guide to REST API concepts — JavaScript fundamentals, HTTP methods, Richardson Maturity Model, and HATEOAS.
        </p>
      </div>

      <div className="explorer-nav">
        {sections.map(s => (
          <button
            key={s.id}
            className={`explorer-nav-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {(activeSection === 'all' || activeSection === 'js') && <JsFundamentals />}
      {(activeSection === 'all' || activeSection === 'http') && <HttpMethodsSection />}
      {(activeSection === 'all' || activeSection === 'rmm') && <RichardsonModel />}
      {(activeSection === 'all' || activeSection === 'hateoas') && <HateoasSection />}
    </section>
  );
}
