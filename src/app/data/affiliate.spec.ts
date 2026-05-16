import { withUtm } from './affiliate';

describe('withUtm', () => {
  it('appends UTM params to a clean URL', () => {
    const out = withUtm('https://heymondo.com/seguro', 'heymondo');
    expect(out).toContain('https://heymondo.com/seguro?');
    expect(out).toContain('utm_source=exploriando');
    expect(out).toContain('utm_medium=affiliate');
    expect(out).toContain('utm_campaign=site');
    expect(out).toContain('utm_content=heymondo');
  });

  it('uses & when the URL already has a query string', () => {
    const out = withUtm('https://x.com/p?ref=abc', 'partner');
    expect(out).toContain('?ref=abc&utm_source=exploriando');
  });

  it('leaves placeholder / non-http URLs untouched', () => {
    expect(withUtm('#', 'p')).toBe('#');
    expect(withUtm('', 'p')).toBe('');
    expect(withUtm('mailto:hi@x.com', 'p')).toBe('mailto:hi@x.com');
  });
});
