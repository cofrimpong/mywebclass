module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx http-server _site -p 8080',
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/gallery/',
        'http://localhost:8080/styles/bauhaus/',
        'http://localhost:8080/styles/minimalism/',
        'http://localhost:8080/styles/neo-futurism/'
      ],
      numberOfRuns: 3
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
