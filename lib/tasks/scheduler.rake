desc "This task is called by the Heroku scheduler add-on"
task :clean_booking => :environment do
  puts "CLEAN BOOKING"
  Booking.where(payment_status: 'pending').where('created_at < ?', 1.hour.ago).each do |model|
      model.destroy
    end

end
