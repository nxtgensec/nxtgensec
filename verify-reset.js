import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function verifyReset() {
  try {
    console.log('🔍 Verifying database reset...\n');

    // Check visitor_logs
    const { count: logsCount } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact' });

    // Check visitor_ips
    const { count: ipsCount } = await supabaseAdmin
      .from('visitor_ips')
      .select('*', { count: 'exact' });

    // Check visitor_stats
    const { data: statsData } = await supabaseAdmin
      .from('visitor_stats')
      .select('*');

    console.log('📊 Database Status:');
    console.log(`  • visitor_logs: ${logsCount} records`);
    console.log(`  • visitor_ips: ${ipsCount} records`);
    console.log(`  • visitor_stats: ${statsData?.length || 0} records`);

    if (logsCount === 0 && ipsCount === 0) {
      console.log('\n✅ Reset successful! Tables are empty.');
      console.log('   Ready to start counting from 0.');
    } else {
      console.log('\n⚠️  Tables still have data. Reset may not have been executed.');
    }

  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    process.exit(1);
  }
}

verifyReset();
