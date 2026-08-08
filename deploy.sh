#!/bin/bash

echo "🚀 Travel & Tourism Deployment Script"
echo "======================================"
echo ""

# Step 1: Add all changes
echo "📦 Step 1: Adding all changes to git..."
git add .

# Step 2: Commit changes
echo "💾 Step 2: Committing changes..."
git commit -m "Add payment methods (Easypaisa, JazzCash, Bank) and Vercel deployment config"

# Step 3: Push to GitHub
echo "⬆️  Step 3: Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📍 Your repository: https://github.com/farazkhanov/travel-tourism"
echo ""
echo "🌐 Next Steps for Vercel Deployment:"
echo "===================================="
echo ""
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'Add New' → 'Project'"
echo "3. Import 'farazkhanov/travel-tourism'"
echo "4. Deploy Frontend:"
echo "   - Root Directory: frontend"
echo "   - Framework: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Environment Variable: VITE_API_URL=[your-backend-url]"
echo ""
echo "5. Deploy Backend:"
echo "   - Create another project from same repo"
echo "   - Root Directory: backend"
echo "   - Add all environment variables (see DEPLOYMENT_GUIDE.md)"
echo ""
echo "6. Set up database (Vercel Postgres, Supabase, or Neon)"
echo "7. Run database migrations"
echo "8. Test your live site!"
echo ""
echo "📖 Full guide: See DEPLOYMENT_GUIDE.md"
echo ""
