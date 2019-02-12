class MailingJob
  include SuckerPunch::Job

  def perform(event)

    @sg ||= SendGrid::API.new(api_key: ENV['SENDGRID'])
    response = @sg.client.mail._('send').post(request_body: event)

  end
end
