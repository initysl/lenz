# Lenz Testing Checklist

## Pre-Launch Testing

### Functionality Tests

- [ ] Camera access works on first launch
- [ ] Permission prompts display correctly
- [ ] Object detection runs smoothly (20+ FPS)
- [ ] GPS location updates correctly
- [ ] Compass heading tracks device orientation
- [ ] OSM places fetch successfully
- [ ] AR cards appear for matched places
- [ ] Expanded cards show full details
- [ ] "Get Directions" opens Google Maps
- [ ] Settings panel saves preferences
- [ ] Cache system works (check localStorage)

### Device Tests

- [ ] iPhone Safari (iOS 15+)
- [ ] Chrome Android
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] iPad Safari

### Performance Tests

- [ ] FPS stays above 15 on low-end devices
- [ ] No memory leaks after 5 minutes of use
- [ ] Battery drain is acceptable
- [ ] Network requests are debounced
- [ ] Cache reduces redundant API calls

### Edge Cases

- [ ] Denied camera permission
- [ ] Denied location permission
- [ ] No GPS signal (indoor)
- [ ] Network offline
- [ ] Low battery warning
- [ ] Poor GPS accuracy
- [ ] No nearby places found
- [ ] iOS orientation permission

### UI/UX

- [ ] Tutorial shows on first launch
- [ ] Tutorial can be skipped
- [ ] All buttons are tappable
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Cards don't block camera view
- [ ] Stats overlay is readable

## Production Checklist

- [ ] Remove console.logs
- [ ] Set proper API rate limits
- [ ] Add analytics (optional)
- [ ] Test on real landmarks
- [ ] Verify HTTPS deployment
- [ ] Test PWA installation
- [ ] Check manifest.json
- [ ] Optimize bundle size
