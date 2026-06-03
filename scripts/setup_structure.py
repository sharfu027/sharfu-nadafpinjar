import os

# Define directories to create
directories = [
    # src/app
    "src/app/frontend/routes",
    "src/app/frontend/layouts",
    "src/app/frontend/pages",
    "src/app/frontend/providers",
    "src/app/frontend/middleware",
    "src/app/backend/routes",
    "src/app/backend/middleware",
    "src/app/backend/websocket",
    
    # src/features
    "src/features/auth/frontend",
    "src/features/auth/backend",
    "src/features/auth/api",
    "src/features/auth/services",
    "src/features/auth/schemas",
    "src/features/auth/models",
    "src/features/auth/hooks",
    "src/features/auth/components",
    "src/features/auth/tests",
    "src/features/users",
    "src/features/face-auth/frontend",
    "src/features/face-auth/backend",
    "src/features/face-auth/api",
    "src/features/face-auth/components",
    "src/features/face-auth/hooks",
    "src/features/face-auth/services",
    "src/features/face-auth/embeddings",
    "src/features/face-auth/liveness",
    "src/features/face-auth/recognition",
    "src/features/face-auth/tests",
    "src/features/geolocation",
    "src/features/dashboard",
    "src/features/attendance",
    "src/features/notifications",
    "src/features/analytics",
    "src/features/reports",
    
    # src/shared
    "src/shared/components",
    "src/shared/hooks",
    "src/shared/utils",
    "src/shared/constants",
    "src/shared/types",
    "src/shared/validators",
    "src/shared/assets",
    
    # src/core
    "src/core/config",
    "src/core/database",
    "src/core/security",
    "src/core/cache",
    "src/core/queue",
    "src/core/logging",
    "src/core/exceptions",
    
    # src/services
    "src/services/email",
    "src/services/sms",
    "src/services/storage",
    "src/services/payment",
    "src/services/third-party",
    
    # src/ai
    "src/ai/models",
    "src/ai/embeddings",
    "src/ai/vector-db",
    "src/ai/training",
    "src/ai/prompts",
    "src/ai/rag",
    "src/ai/agents",
    
    # src/tests
    "src/tests/unit",
    "src/tests/integration",
    "src/tests/e2e",
    "src/tests/performance",
    "src/tests/security",
    
    # database
    "database/migrations",
    "database/seeders",
    "database/schemas",
    "database/indexes",
    "database/backups",
    
    # infrastructure
    "infrastructure/docker",
    "infrastructure/nginx",
    "infrastructure/kubernetes",
    "infrastructure/terraform",
    "infrastructure/monitoring",
    
    # scripts, docs, github
    "scripts",
    "docs",
    ".github/workflows"
]

# Define empty placeholder files to create if they don't exist
placeholder_files = [
    "src/main.py",
    "src/app/backend/server.py",
    "docker-compose.yml",
    "requirements.txt",
    ".env"
]

def main():
    print("Starting directory and file creation...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Create directories and write .gitkeep files for git tracking
    for directory in directories:
        dir_path = os.path.join(base_dir, directory)
        if not os.path.exists(dir_path):
            os.makedirs(dir_path)
            print(f"Created directory: {directory}")
        else:
            print(f"Directory already exists: {directory}")
            
        # Ensure .gitkeep exists so git tracks empty directories
        gitkeep_path = os.path.join(dir_path, ".gitkeep")
        if not os.path.exists(gitkeep_path):
            with open(gitkeep_path, 'w', encoding='utf-8') as f:
                f.write("")
            print(f"Created .gitkeep in: {directory}")
            
    # Create placeholder files
    for file in placeholder_files:
        file_path = os.path.join(base_dir, file)
        if not os.path.exists(file_path):
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write("")
            print(f"Created file: {file}")
        else:
            print(f"File already exists: {file}")
            
    print("Finished directory and file creation successfully!")

if __name__ == "__main__":
    main()
