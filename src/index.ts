interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * tinder-bio MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Generate a dating profile bio. Red flags embedded at no extra charge.
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'tinder_bio_generate',
    description: 'Generate a dating profile bio. Red flags embedded at no extra charge.',
    inputSchema: {
      type: 'object' as const,
      properties: {"age": {"type": "number"}, "profession": {"type": "string"}, "personality": {"type": "string", "description": "Comma-separated: adventurous, homebody, foodie, gym_rat, intellectual, creative, outdoorsy, gamer, spiritual, workaholic, recently_divorced, dog_person, cat_person, doesnt_know_how_to_describe_self"}, "situation": {"type": "string", "enum": ["new_to_app", "returned_after_break", "just_got_out_of_something", "never_done_this_before", "doing_this_for_a_friend"]}, "gender": {"type": "string"}, "dealbreaker": {"type": "string"}, "looking_for": {"type": "string", "enum": ["friendship", "relationship", "not_sure", "lying_about_this"]}, "energy": {"type": "string", "enum": ["low_effort", "trying_too_hard", "unhinged_honesty", "corporate", "post_breakup"]}},
      required: [],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('tinder-bio API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'tinder_bio_generate':
      return callApi('https://api.stupidapis.com/tinder-bio/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
