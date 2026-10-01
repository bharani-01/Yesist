import {
  Coffee,
  ShoppingBag,
  Trees,
  GraduationCap,
  Zap,
  ShieldCheck,
  Award,
  Gift,
  Users,
  Smartphone,
  Truck,
  Sparkles,
  FileCheck,
  Lock,
} from 'lucide-react';

export function RewardIcon({ name, size = 20, className = '' }) {
  const norm = String(name || '').toLowerCase().trim();

  if (norm === 'coffee' || norm === 'coffee_voucher' || norm.includes('coffee')) {
    return <Coffee size={size} className={className} />;
  }
  if (norm === 'shopping_bag' || norm === 'amazon' || norm === 'amazon_coupon' || norm.includes('amazon') || norm.includes('voucher')) {
    return <ShoppingBag size={size} className={className} />;
  }
  if (norm === 'tree' || norm === 'trees' || norm === 'plant_tree' || norm.includes('tree')) {
    return <Trees size={size} className={className} />;
  }
  if (norm === 'education' || norm === 'school' || norm === 'school_donation' || norm.includes('school')) {
    return <GraduationCap size={size} className={className} />;
  }
  if (norm === 'zap' || norm === 'lightning' || norm === 'priority_slot' || norm.includes('priority')) {
    return <Zap size={size} className={className} />;
  }
  if (norm === 'award' || norm === 'ecosure_pro_badge' || norm.includes('badge')) {
    return <Award size={size} className={className} />;
  }
  if (norm === 'pickup_collected') {
    return <Truck size={size} className={className} />;
  }
  if (norm === 'device_collected' || norm.includes('device') || norm.includes('phone')) {
    return <Smartphone size={size} className={className} />;
  }
  if (norm === 'data_bearing_bonus') {
    return <Lock size={size} className={className} />;
  }
  if (norm === 'attestation_issued' || norm.includes('cert')) {
    return <FileCheck size={size} className={className} />;
  }
  if (norm === 'referral_bonus' || norm.includes('referral')) {
    return <Users size={size} className={className} />;
  }
  if (norm === 'device_added') {
    return <Smartphone size={size} className={className} />;
  }
  if (norm === 'profile_complete' || norm.includes('welcome')) {
    return <Sparkles size={size} className={className} />;
  }
  if (norm === 'redemption') {
    return <Gift size={size} className={className} />;
  }

  // Default fallback icon
  return <Gift size={size} className={className} />;
}
